import FormInput from "../atoms/FormInput";

const SignUp = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h3 className="font-bold text-[24px]">Create Your Account</h3>
      <form className="max-w-[25vw] w-[20vw] p-2 flex flex-col mobile:max-sm:w-[95vw] mobile:max-sm:max-w-[95vw] gap-3">
        <FormInput
          label={"Name"}
          onChange={(e: { target: { value: any } }) => {}}
        />
        <FormInput
          label={"Email"}
          onChange={(e: { target: { value: any } }) => {}}
        />

        <FormInput
          label={"Password"}
          onChange={(e: { target: { value: any } }) => {}}
        />
        <button className="bg-primarytheme text-white p-2 ">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
