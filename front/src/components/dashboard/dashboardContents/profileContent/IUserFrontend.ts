interface IUserFrontend {
  name: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: Date | undefined;
  subscriptionStatus: "free" | "basic" | "premium";
}

export default IUserFrontend;