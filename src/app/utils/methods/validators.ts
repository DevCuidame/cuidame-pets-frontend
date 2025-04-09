export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^\d{7,}$/;
  return phoneRegex.test(phoneNumber);
}


export function isValidDate(dateString: string): boolean {
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dateString)) {
    console.log("Invalid format");
    return false;
  }

  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  if (year < 1900 || year > 2100) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }

  const date = new Date(`${dateString}T00:00:00Z`);

  const isValid = date.getUTCFullYear() === year && (date.getUTCMonth() + 1) === month && date.getUTCDate() === day;
  
  return isValid;
}

export function isFutureDate(dateString: string): boolean {
  if (!isValidDate(dateString)) {
    return false;
  }

  const date = new Date(`${dateString}T00:00:00Z`);
  const now = new Date();

  if (date > now) {
    return true;
  }

  return false;
}

