import React, { useEffect } from "react";
import { authService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/custom/Spinner";

const Logout = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => await authService.logout(),
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    console.log("got here bro");
    mutate();
  }, []);

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Logout;
