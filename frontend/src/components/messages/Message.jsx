const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image awatar">
        <div className="w-10 rounded-full">
          <img
            alt="tailwind css chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>hi what's upp</div>
      <div className="chat-footer opacity-50  text-white text-xs flex gap-1 items-center">
        {" "}
        12.42{" "}
      </div>
    </div>
  );
};

export default Message;
