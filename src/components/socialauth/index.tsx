import google from '../../assets/GoogleAuth.png';
import microsoft from '../../assets/MicrosoftAuth.png';


function SocialAuth() {
    return (
        <div className="  pt-5 text-xl font-bold text-center justify-center text-black  bg-white">
            OR <br />
            <div className="flex  pt-5 text-xl font-bold  text-black justify-center bg-white">
                <button>
                    <img src={google} alt="" />
                </button>

                <button className="pl-12 ">
                    <img src={microsoft} alt="" />
                </button>
            </div>
        </div>

    )
}
export default SocialAuth;