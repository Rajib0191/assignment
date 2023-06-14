import { useEffect, useState } from "react";
import axios from "axios";
const useUserList = (value) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://59.152.62.177:8085/api/Employee/EmployeeData"
        );
        const filterData = response?.data?.readEmployeeData.filter(
          (data) => data.employeeType === value
        );
        setData(filterData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [value]);
  return { data, error, loading };
};

export default useUserList;
