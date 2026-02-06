import React from 'react'
import { useEffect } from 'react';
import Section01 from '../component/HomeSections/Section01';
import Section02 from '../component/HomeSections/Section02';
import Section03 from '../component/HomeSections/Section03';
import Section04 from '../component/HomeSections/Section04';
import { Truck, RefreshCcw, Headphones } from "lucide-react";
import toast from "react-hot-toast";


function Home() {
 

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const hasVisited = localStorage.getItem("shoeshop_visited");

      if (!hasVisited) {
      toast.success(
            user
              ? `Welcome back, ${user.name}!`
              : "Welcome to SOLE CRAFTS — discover your next step.",
            {
              className: "bg-surface text-text font-semibold px-6 py-4 rounded-lg shadow-lg",
            
              duration: 3000,
            }
          );
        localStorage.setItem("shoeshop_visited", "true");
      }
    }, []);

  
 
  return (
    <div className="container text-text ">
      <Section01/>
      <Section02/>
      <Section03/>

      <section>
            {/* Features */}
            <div className="mt-6 md:mt-10 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center ">
              <div className="flex flex-col items-center gap-2">
                <Truck className="text-primary w-10 h-10" />
                <h4 className="font-semibold text-primary">FREE SHIPPING</h4>
                <p className="text-sm text-muted">On all orders</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <RefreshCcw className="text-primary w-10 h-10" />
                <h4 className="font-semibold text-primary">100% REFUND</h4>
                <p className="text-sm text-muted">Easy return policy</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Headphones className="text-primary w-10 h-10" />
                <h4 className="font-semibold text-primary">SUPPORT 24/7</h4>
                <p className="text-sm text-muted">Dedicated support</p>
              </div>
            </div>
      </section>

        <Section04/>
      
       
    </div>
  )
}

export default Home
