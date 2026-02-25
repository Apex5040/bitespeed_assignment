export const buildResponse = (contacts: any[]) => {

  const primary = contacts.find(c => c.linkPrecedence === "primary");

  const emails = [
    primary.email,
    ...contacts
      .filter(c => c.id !== primary.id)
      .map(c => c.email)
      .filter(Boolean)
  ];

  const phoneNumbers = [
    primary.phoneNumber,
    ...contacts
      .filter(c => c.id !== primary.id)
      .map(c => c.phoneNumber)
      .filter(Boolean)
  ];

  const secondaryContactIds =
    contacts
      .filter(c => c.linkPrecedence === "secondary")
      .map(c => c.id);

  return {
    contact: {
      primaryContatctId: primary.id,
      emails: [...new Set(emails)],
      phoneNumbers: [...new Set(phoneNumbers)],
      secondaryContactIds
    }
  };
};