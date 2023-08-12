import { Image, SpinLoading } from "antd-mobile";
import { ORIGIN } from "../../constants";

const Loading = () => {
  return (
    <div
      role="status"
      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex flex-col justify-center items-center"
    >
      <div className="flex justify-center items-center">
        <Image
          className="w-8 aspect-square"
          src={`${ORIGIN}/favicon_package_v0.16/favicon.ico`}
        />
        Flash Score App
      </div>
      <SpinLoading color="primary" />
    </div>
  );
};

export default Loading;
