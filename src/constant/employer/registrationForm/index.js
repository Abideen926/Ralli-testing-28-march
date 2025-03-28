export const BASIC_REGISTRATION = {
    logo: "/assets/images/Ralli_Dark_Vert_Logo.png",
    title: "Company Registration Continued",
    form: [
      {
        label: "Phone Number*",
        name: "phone",
        placeHolder: "+1",
      },
      {
        label: "Country*",
        name: "country", 
        type: "dropdown",
      },
      {
        label: "Address",
        name: "address",
        placeHolder: "Your Address (Optional)",
      },
      {
        label: "State*",
        name: "state", 
        type: "dropdown", 
      },
      {
        label: "City*",
        name: "city",
        type: "dropdown", 
      },
      {
        label: "Zip Code*",
        name: "zip_code",
        placeHolder: "Your Zip Code",
      },
    ],
  };
  
export const COMPANY_REGISTRATION = {
  logo: "/assets/images/Ralli_Dark_Vert_Logo.png",
  title: "Company Information",
  form: [
    {
      label: "Company Name",
      name: "company_name",
      placeHolder: "Company Name",
      type:'text'
    },
    {
      label: "Company Size",
      name: "company_size",
      type: "number",
      placeHolder: "Number of Employees",
      type:'number'
    },
    {
      label: "Industry",
      name: "industry",
      placeHolder: "Industry Type",
      type:'text'
    },
    {
      label: "Company Type",
      name: "company_type",
      placeHolder: "Company Type",
      type:'text'
    },
    {
      label: "Founded",
      name: "founded",
      placeHolder: "Founded Year",
      type:'number'
    },
    {
      label: "Website",
      name: "website",
      placeHolder: "Website URL",
      type:'text'
    },
    {
      label: "About",
      name: "about",
      placeHolder: "Describe Your Company",
      type:'text'
    },
  ],
};
export const FINAL_REGISTRATION = {
  logo: "/assets/images/Ralli_Dark_Vert_Logo.png",
  title: "Company Registration",
  form: [
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeHolder: "Enter Email",
    },
    {
      label: "Username",
      name: "username",
      placeHolder: "Enter Username",
    },
    {
      label: "Password",
      name: "password",
      placeHolder: "**********",
    },
    {
      label: "Confirm Password",
      name: "password_confirmation",
      placeHolder: "**********",
    },
  ],
};

export const EMPLOYER_EMAIL_VERIFICATIONS = {
  logo: "/assets/images/Ralli_Dark_Vert_Logo.png",
  title: "Email Verification",
  description: 'Please Check Your Email (Junk/SPAM), or Phone For The OTP Verification Code.',
  form: [
    {
      name: "verification",
      names: "Verification Code*",
      placeHolder: "'Enter your OTP",
    },
  ],
};
