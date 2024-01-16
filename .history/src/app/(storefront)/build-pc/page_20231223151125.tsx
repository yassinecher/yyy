import prismadb from '@/lib/prismadb';
import React from 'react';

const buildPc = async () => {
  try {
    const profiles = await prismadb.compatibiltyProfile.findMany({
      // Specify your query parameters here
      include:{
        cases:true,
        CPUs:true,
        disks:true,
        motherboards:true,
        GPUs:true,
        powersupplys:true,
        RAMs:{
            include:{
                rams:true
            }
        },
      }
    });

    return (
      <div>
        <p>buildPc</p>
        
        {profiles.map(profile => (
          <div key={profile.id}>
            {/* Render profile data here */}
            <p>{profile.name}</p>
            <p>{profile.RAMs.map(e=>(<>
            {e.rams.map(ee=>(<>
             {ee.name}
            </>))}</>))}</p>
            {/* Add other profile properties as needed */}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching compatibility profiles:', error);
    // Handle the error as needed
    return <div>Error loading profiles</div>;
  }
};

export default buildPc;
