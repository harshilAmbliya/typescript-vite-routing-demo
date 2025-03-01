import { getAllUsers } from "@/redux/actions/userAction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

const Dashboard = (_: Props) => {
  const [users, setUsers] = useState([]);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({})).then((res: any) => {
      if (res) {
        setUsers(res.payload);
      }
    });
  }, []);

  return (
    <div className="p-4">
      <div>Dashboard</div>
      <div>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;
