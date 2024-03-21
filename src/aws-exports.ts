interface Auth {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  mandatorySignIn: boolean;
}

const aws = {
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_JjsQgn3PG",
    userPoolWebClientId: "4gp6rvig65nqs73i5l17t628rp",
    mandatorySignIn: false,
    oauth: {
      domain: "https://project-pulse-dev.auth.ap-south-1.amazoncognito.com",
      scope: [
        "aws.cognito.signin.user.admin",
        "email",
        "openid",
        "profile",
        "phone",
      ],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/login",
      responseType: "code",
    },
  } as Auth,
};

export default aws;
