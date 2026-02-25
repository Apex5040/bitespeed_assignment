import { prisma } from "../prisma/client";
import { buildResponse } from "../utils/buildResponse";

export const identifyContact = async (
  email?: string,
  phoneNumber?: string
) => {

  return await prisma.$transaction(async (tx) => {

    const matches = await tx.contact.findMany({
      where: {
        OR: [
          { email: email || undefined },
          { phoneNumber: phoneNumber || undefined }
        ]
      }
    });

    if (matches.length === 0) {
      const newContact = await tx.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: "primary"
        }
      });

      return buildResponse([newContact]);
    }

    // find primary
    const primary = matches.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    )[0];

    // convert others to secondary if needed
    for (let contact of matches) {
      if (contact.id !== primary.id && contact.linkPrecedence === "primary") {
        await tx.contact.update({
          where: { id: contact.id },
          data: {
            linkPrecedence: "secondary",
            linkedId: primary.id
          }
        });
      }
    }

    // check if new info
    const emailExists = matches.some(c => c.email === email);
    const phoneExists = matches.some(c => c.phoneNumber === phoneNumber);

    if (!emailExists || !phoneExists) {
      await tx.contact.create({
        data: {
          email,
          phoneNumber,
          linkedId: primary.id,
          linkPrecedence: "secondary"
        }
      });
    }

    const finalCluster = await tx.contact.findMany({
      where: {
        OR: [
          { id: primary.id },
          { linkedId: primary.id }
        ]
      }
    });

    return buildResponse(finalCluster);
  });
};