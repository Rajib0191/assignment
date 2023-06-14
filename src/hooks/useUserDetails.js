import { useEffect, useState } from "react";
import axios from "axios";
const useUserDetails = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${userId}`
        );
        setData(response?.data?.readEmployeeData[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [userId]);
  return { data, error, loading };
};

export default useUserDetails;
