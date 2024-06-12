const Error = ({ errMessage }) => {
  return (
    <div className="flex items-center justify-center rounded-lg w-auto h-[60px] bg-[#FF3333]">
      <h3 className="text-white text-[20px] leading-[30px] font-semibold">
        {errMessage}
      </h3>
    </div>
  );
};

export default Error;
