import { useSelector, useDispatch } from "react-redux";
import { TabStatus, setSwitch } from "Slices/SwitchSlice";
import cx from "classnames";

const SwitchTab = () => {
  const dispatch = useDispatch();
  const { tab } = useSelector((state: any) => state.Switch);

  const onClickHandler = (status: TabStatus) => {
    dispatch(setSwitch({ tab: status }));
  };

  return (
    <div className="switchContainer">
      <span onClick={() => onClickHandler("all")}>On Going Tasks</span>
      <span onClick={() => onClickHandler("completed")}>Completed Tasks</span>
      <div className={cx([{ active: tab !== "all" }])} />
    </div>
  );
};

export default SwitchTab;
