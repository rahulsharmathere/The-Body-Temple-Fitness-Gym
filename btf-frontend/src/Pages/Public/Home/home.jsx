import React, { useState, useEffect } from 'react'
import Navbar from '../../../Components/Public/Navbar/navbar'
import Hero from '../../../Components/Public/Hero/hero'
import About from '../../../Components/Public/About/about'
import Plans from '../../../Components/Public/Plans/plans'
import Gallery from '../../../Components/Public/Gallery/gallery'
import Footer from '../../../Components/Public/Footer/footer'
import Loader from '../../../Components/Loader/loader'
import { getGymInfo, getPlans } from './data'

const Home = () => {

  const [gymInfo, setGymInfo] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const infoData = await getGymInfo();
      setGymInfo(infoData.data);

      const plansData = await getPlans();
      setPlans(plansData.data);
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='w-full bg-ink-950'>
      <Navbar gymName={gymInfo?.gymName} />
      <Hero gymName={gymInfo?.gymName} tagline={gymInfo?.tagline} heroImage={gymInfo?.heroImage} />
      <About description={gymInfo?.description} address={gymInfo?.address} timings={gymInfo?.timings} phone={gymInfo?.phone} />
      <Plans plans={plans} />
      <Gallery gallery={gymInfo?.gallery} />
      <Footer gymName={gymInfo?.gymName} phone={gymInfo?.phone} email={gymInfo?.email} instagram={gymInfo?.instagram} facebook={gymInfo?.facebook} />
    </div>
  )
}

export default Home
