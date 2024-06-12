const TimeSlots = () => {
  return (
    <div>
      <form className="mx-auto shadow-2xl lg:w-full p-7 rounded-xl">
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
          Appointments & Time Slots Info
        </h2>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
          <div>
            <label className="form__label">Day*</label>
            <select name="day" className="form__input py-">
              <option value="">Select</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="tuesday">Tuesday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TimeSlots;
