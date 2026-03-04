import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
    return (
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#444444"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
                position: 'fixed',
                top: "50%",
                left: "50%",
                transform: 'translate(-50%, -50%)',
                zIndex: '1000',
            }}
            wrapperClass=""
        />
    );
}
