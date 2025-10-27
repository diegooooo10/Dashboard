const errorMessages: Record<string, string> = {
  "auth/invalid-credential":
    "The authentication credential is invalid. Please try again.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/weak-password": "The password is too weak.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "The new password cannot be the same as the current one.":
    "The new password cannot be the same as the current one.",
  "Out of stock": "Out of stock",
};

export const handleFirebaseError = (error: string) =>
  errorMessages[error] || "Something went wrong, please try again.";
