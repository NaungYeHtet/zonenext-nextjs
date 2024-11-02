import Image from "next/image";

export default function GoogleAuthButton() {
  const googleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_PATH}/auth/google/redirect`;
  };

  return (
    <button
      type="button"
      className="group h-12 px-6 border-2 border-gray-300 bg-white rounded-md transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
      onClick={() => googleLogin()}
    >
      <div className="relative flex items-center space-x-4 justify-center">
        <Image
          width={20}
          height={20}
          src={"https://www.svgrepo.com/show/475656/google-color.svg"}
          className="absolute left-0 w-5"
          alt="google logo"
        />
        <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
          Continue with Google
        </span>
      </div>
    </button>
  );
}
