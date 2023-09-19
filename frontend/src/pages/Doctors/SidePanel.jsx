const SidePanel = () => {
  return (
    <div className="p-3 rounded-md shadow-panelShadow lg:p-5">
      <div className="flex items-center justify-between ">
        <p className="mt-0 font-semibold text__para">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          &euro;500
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="mt-0 font-semibold text__para text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Sunday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4:00 PM - 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4:00 PM - 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Wednesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4:00 PM - 9:30 PM
            </p>
          </li>
        </ul>
      </div>

      <button className="w-full px-2 rounded-md btn">Bool Appointment</button>
    </div>
  );
};

export default SidePanel;
