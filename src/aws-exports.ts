interface Auth {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  mandatorySignIn: boolean;
}

const aws = {
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_oLSTHFxKC",
    userPoolWebClientId: "rqr1fg98ietm36fd12r7co39d",
    mandatorySignIn: false,
    oauth: {
      domain: "https://project-timify-dev.auth.ap-south-1.amazoncognito.com",
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
