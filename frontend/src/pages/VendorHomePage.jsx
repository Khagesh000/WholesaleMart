import React from 'react'
import VendorHomepageHeader from '../components/VendorHomepageHeader'; 
import VendorStockUpload from '../components/VendorStock/VendorStockUpload';

export default function VendorHomePage() {
  return (
    <div>
      <VendorHomepageHeader />
      <VendorStockUpload />
    </div>
  )
}
