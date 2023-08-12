import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourseByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DepandentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  useQuery(["courses", channelId], () => fetchCourseByChannelId(channelId), {
    enabled: !!channelId, // it will only execute after channelId will set
  });

  return <div>DepandentQueries</div>;
};
