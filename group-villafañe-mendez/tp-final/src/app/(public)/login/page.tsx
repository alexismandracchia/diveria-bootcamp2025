import { PublicOnlyRoute } from "./components/PublicOnlyRoute";

const page = () => {
  return (
    <PublicOnlyRoute>
      <div>Login</div>
    </PublicOnlyRoute>
  );
};

export default page;
