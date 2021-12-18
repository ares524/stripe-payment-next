import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Home() {
  const items = [
    {
      title: "Apple Macbook Pro",
      description: "Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 256GB Storage",
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_IN?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1613672874000",
      price: 122900,
    },
  ];

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: "test@gmail.com",
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-green-400">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {items?.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl h-[500px] w-[400px] p-3 shadow-xl flex flex-col justify-center items-center"
        >
          <Image
            width={300}
            height={300}
            objectFit="contain"
            src={item.image}
            alt={item.title}
          />
          <h2 className="text-center font-semibold">{item.title}</h2>
          <h2 className="text-center">{item.description}</h2>
          <h3>₹{item.price}</h3>
          <button
            onClick={createCheckOutSession}
            role="link"
            className="bg-green-400 px-4 py-2 rounded-lg"
          >
            Buy now
          </button>
        </div>
      ))}
    </div>
  );
}
