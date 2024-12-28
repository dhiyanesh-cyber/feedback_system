import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formResponsePopulate } from "../../utils/FormResponsePopulate";
import FormCard from "../../components/student/FormCard";
import Navbar from "../../components/Nabvbar";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

const StudentPanel = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibility, setVisibility] = useState('hidden');

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (!userDetails || userDetails.role !== "student" || !userDetails.registrationNumber) {
      console.log("From std panel: Invalid user details", userDetails);
      navigate("/auth");
      return;
    }

    const fetchFormsData = async () => {
      try {
        const data = await formResponsePopulate(userDetails);
        setForms(data);
        await new Promise(resolve => setTimeout(resolve, 100));
        setLoading(false);
        setVisibility('visible');
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError(err.message);
      }
    };

    fetchFormsData();
  }, [navigate]);

  // Skeleton loading component
  const LoadingSkeleton = () => (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen p-6 sm:pt-12">
        <Card className="w-full max-w-4xl m-5 space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      </div>
    </>
  );

  const MainContent = () => {
    const notFilledForms = forms.filter((form) => form.status === "not-filled");
    const filledForms = forms.filter((form) => form.status === "filled");

    return (
      <>
        <Navbar />
        <div className="h-[40rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-start sm:pt-6 justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex flex-col items-center justify-start p-6 min-h-screen">
            <Card className="w-full max-w-4xl m-5">
              <CardHeader className="flex flex-col gap-3 p-6">
                <h1 className="text-md font-semibold text-left w-full sm:text-xl">
                  Welcome to the Student Panel
                </h1>
                <p className="text-sm text-default-500 text-left w-full">
                  Hello,
                  <span className="font-medium text-black">
                    {" "}{JSON.parse(localStorage.getItem("userDetails")).name}{" "}
                  </span>
                  with Registration Number:{" "}
                  <span className="font-medium text-black">
                    {JSON.parse(localStorage.getItem("userDetails")).registrationNumber}
                  </span>
                </p>
              </CardHeader>

              <Divider />

              <CardBody className="p-2">
                {/* Not-Filled Forms Section */}
                <div className="mb-6">
                  <CardHeader className="flex flex-col gap-2">
                    <h2 className="text-md text-left w-full font-semibold sm:text-xl">
                      Yet to fill :
                    </h2>
                  </CardHeader>
                  <CardBody>
                    {notFilledForms.length > 0 ? (
                      <div className="space-y-4">
                        {notFilledForms.map((form) => (
                          <FormCard key={form.form_id} form={form} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">All forms are filled.</p>
                    )}
                  </CardBody>
                </div>

                {/* Filled Forms Section */}
                {filledForms.length > 0 && (
                  <div>
                    <CardHeader className="flex flex-col gap-2">
                      <h2 className="text-md text-left w-full font-semibold sm:text-xl">
                        Filled Forms :
                      </h2>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        {filledForms.map((form) => (
                          <FormCard key={form.form_id} form={form} />
                        ))}
                      </div>
                    </CardBody>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div
          style={{
            visibility: visibility,
            opacity: visibility === 'visible' ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <MainContent />
        </div>
      )}
    </>
  );
};

export default StudentPanel;