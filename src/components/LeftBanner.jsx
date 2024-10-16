import taskManagement from "../assets/Task-Management.png";

function LeftBanner() {
  return (
    <div className=" h-full relative overflow">
      <img
        className="absolute left-1/2 top-1/2  transform -translate-y-1/2"
        src={taskManagement}
        alt="login-img"
      />
    </div>
  );
}

export default LeftBanner;
