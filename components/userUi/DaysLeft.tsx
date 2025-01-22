import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface DaysLeftProps {
  onClose: () => void;
  tenantId: string;
}

const DaysLeft: React.FC<DaysLeftProps> = ({ onClose, tenantId }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGirisTarihi = async () => {
      try {
        const response = await fetch(`/api/daysleft/?tenant_id=${tenantId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data?.girisTarihi) {
          const girisTarihi = new Date(data.girisTarihi);

          const paymentDueDate = new Date(girisTarihi);
          paymentDueDate.setMonth(paymentDueDate.getMonth() + 1);

          const updateTimer = () => {
            const now = new Date().getTime();
            const distance = paymentDueDate.getTime() - now;

            if (distance <= 0) {
              setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
              return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
          };

          updateTimer();
          const interval = setInterval(updateTimer, 1000);

          return () => clearInterval(interval);
        } else {
          setError("Kiralık eviniz bulunamadı..");
        }
      } catch (error) {
        setError("Error fetching data: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGirisTarihi();
  }, [tenantId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
          Ödeme için kalan gün sayısı
        </h2>

        {loading ? (
          <p className="text-gray-700 text-center">Veriler yükleniyor...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <div className="flex items-center justify-center space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-4xl p-6 rounded-lg shadow-md hover:scale-105 transition-transform ">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="text-gray-600 mt-2 uppercase text-sm">
                    {unit === "days"
                      ? "Günler"
                      : unit === "hours"
                        ? "Saatlar"
                        : unit === "minutes"
                          ? "Dakikalar"
                          : "Saniyeler"}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-600 hover:to-green-500 transition-all duration-300">
                Öde
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DaysLeft;
