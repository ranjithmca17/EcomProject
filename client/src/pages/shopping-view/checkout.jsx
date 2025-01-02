
// import React, { useState, useEffect } from "react";
// import Address from "@/components/shopping-view/address";
// import img from "../../assets/account.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymentStart] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Automatically navigate to the approval URL when it becomes available
//   useEffect(() => {
//     if (approvalURL) {
//       navigate(approvalURL);
//     }
//   }, [approvalURL, navigate]);

//   // Handle success alert after page refresh
//   useEffect(() => {
//     const orderSuccess = localStorage.getItem("orderSuccess");
//     if (orderSuccess) {
//       toast({
//         title: "Order created successfully!",
//         description: "Your order is being processed.",
//         variant: "success",
//       });
//       localStorage.removeItem("orderSuccess");
//     }
//   }, [toast]);

//   // Calculate total cart amount
//   const totalCartAmount =
//     cartItems?.items?.reduce(
//       (sum, item) =>
//         sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
//       0
//     ) || 0;

//   // Handle PayPal payment initiation
//   const handleInitiatePaypalPayment = () => {
//     if (!cartItems?.items?.length) {
//       toast({
//         title: "Your cart is empty. Please add items to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!currentSelectedAddress) {
//       toast({
//         title: "Please select an address to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id, // Ensure this is the correct cart ID
//       cartItems: cartItems.items.map((item) => ({
//         productId: item?.productId,
//         title: item?.title,
//         image: item?.image,
//         price: item?.salePrice > 0 ? item?.salePrice : item?.price,
//         quantity: item?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     dispatch(createNewOrder(orderData))
//       .then((data) => {
//         if (data?.payload?.success) {
//           setIsPaymentStart(true);
//           localStorage.setItem("orderSuccess", "true"); // Store success flag
//         } else {
//           setIsPaymentStart(false);
//         }
//       })
//       .catch((error) => {
//         toast({
//           title: "Error creating order",
//           description: error?.message || "Something went wrong",
//           variant: "destructive",
//         });
//         setIsPaymentStart(false);
//       });
//   };

//   return (
//     <div className="flex flex-col">
//       {/* Hero Image */}
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img src={img} alt="Account Image" className="h-full w-full object-cover object-center" />
//       </div>

//       {/* Main Checkout Container */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         {/* Address Selection */}
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />

//         <div className="flex flex-col gap-4">
//           {/* Cart Items Display */}
//           {cartItems?.items?.length ? (
//             cartItems.items.map((item) => <UserCartItemsContent cartItem={item} key={item?.productId} />)
//           ) : (
//             <div>Your cart is empty.</div>
//           )}

//           {/* Total Price Display */}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* PayPal Checkout Button */}
//           <div className="mt-4 w-full">
//             <Button onClick={handleInitiatePaypalPayment} className="w-full">
//               {isPaymentStart ? "Processing PayPal Payment..." : "Checkout with PayPal"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;



import React, { useState, useEffect } from "react";
import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { resetCart } from "@/store/shop/shopCart-slice";  // Assuming resetCart exists

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Automatically navigate to the approval URL when it becomes available
  useEffect(() => {
    if (approvalURL) {
      navigate(approvalURL);
    }
  }, [approvalURL, navigate]);

  // Calculate total cart amount
  const totalCartAmount =
    cartItems?.items?.reduce(
      (sum, item) =>
        sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
      0
    ) || 0;

  // Handle PayPal payment initiation
  const handleInitiatePaypalPayment = () => {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select an address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id, // Ensure this is the correct cart ID
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData))
      .then((data) => {
        if (data?.payload?.success) {
          // Clear the cart and show success message
          dispatch(resetCart());
          toast({
            title: "Order created successfully!",
            description: "Your order is being processed.",
            variant: "success",
          });
          // Store success flag in localStorage
          localStorage.setItem("orderSuccess", "true"); 
          window.location.reload();
        } else {
          setIsPaymentStart(false);
        }
      })
      .catch((error) => {
        toast({
          title: "Error creating order",
          description: error?.message || "Something went wrong",
          variant: "destructive",
        });
        setIsPaymentStart(false);
      });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} alt="Account Image" className="h-full w-full object-cover object-center" />
      </div>

      {/* Main Checkout Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Address Selection */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div className="flex flex-col gap-4">
          {/* Cart Items Display */}
          {cartItems?.items?.length ? (
            cartItems.items.map((item) => <UserCartItemsContent cartItem={item} key={item?.productId} />)
          ) : (
            <div>Your cart is empty.</div>
          )}

          {/* Total Price Display */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* PayPal Checkout Button */}
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart ? "Processing PayPal Payment..." : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
