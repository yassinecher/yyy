import { FilterList } from "./sideBar";

export const addmotherboardFitlters=(decodedFilterList:FilterList)=>{





    const whereClause: Record<string, any> = {
        motherboard: {
          some: {},
        },
      };

      const motherboardFilters = [];
    
      const chipsetFilter = decodedFilterList.motherboardchipset;
      if (chipsetFilter && chipsetFilter.length > 0) {
        motherboardFilters.push({
          chipset: {
            name: {
              in: decodedFilterList.motherboardchipset.map(item => item.searchKey),
            },
          },
        });
      }
    
      const motherboardcpusupportFilter = decodedFilterList.motherboardcpusupport;
      if (motherboardcpusupportFilter && motherboardcpusupportFilter.length > 0) {
        motherboardFilters.push({
          cpusupport: {
            name: {
              in: decodedFilterList.motherboardcpusupport.map(item => item.searchKey),
            },
          },
        });
      }
    
      const motherboardformatFilter = decodedFilterList.motherboardformat;
      if (motherboardformatFilter && motherboardformatFilter.length > 0) {
        motherboardFilters.push({
          format: {
            name: {
              in: decodedFilterList.motherboardformat.map(item => item.searchKey),
            },
          },
        });
      }
    
      const motherboardmanufacturerFilter = decodedFilterList.motherboardmanufacturer;
      if (motherboardmanufacturerFilter && motherboardmanufacturerFilter.length > 0) {
        motherboardFilters.push({
          manufacturer: {
            name: {
              in: decodedFilterList.motherboardmanufacturer.map(item => item.searchKey),
            },
          },
        });
      }
    
      const motherboardramslotsFilter = decodedFilterList.motherboardramslots;
      if (motherboardramslotsFilter && motherboardramslotsFilter.length > 0) {
        motherboardFilters.push({
          ramslots: {
            name: {
              in: decodedFilterList.motherboardramslots.map(item => item.searchKey),
            },
          },
        });
      }
    
      if (motherboardFilters.length > 0) {
        whereClause.motherboard = {
          some: {
            AND: motherboardFilters,
          },
        };
      }
    
    return{
       data: whereClause.motherboard
    }
}
export const addcpuFitlters=(decodedFilterList:FilterList)=>{





    const whereClause: Record<string, any> = {
        cpus: {
          some: {},
        },
      };
      const cpuFilters = [];
      const chipsetFilter = decodedFilterList.cPUSupport;
      if (chipsetFilter && chipsetFilter.length > 0) {
        cpuFilters.push({
          cpusupport: {
            name: {
              in: decodedFilterList.cPUSupport.map(item => item.searchKey),
            },
          },
        });
      }
    
      const motherboardcpusupportFilter = decodedFilterList.processorModel;
      if (motherboardcpusupportFilter && motherboardcpusupportFilter.length > 0) {
        cpuFilters.push({
          processorModel: {
            name: {
              in: decodedFilterList.processorModel.map(item => item.searchKey),
            },
          },
        });
      }
 
     
      if (cpuFilters.length > 0) {
        whereClause.cpus = {
          some: {
            AND: cpuFilters,
          },
        };
      }
    
    return{
       data: whereClause.cpus
    }
}

export const addgpuitlters=(decodedFilterList:FilterList)=>{





    const whereClause: Record<string, any> = {
        gpus: {
          some: {},
        },
      };
      const cpuFilters = [];
   
      const chipsetFilter = decodedFilterList.gpuArchBrand;
      if (chipsetFilter && chipsetFilter.length > 0) {
        cpuFilters.push({
          graphiccardName: {
            gpuArchBrand: {
              in: decodedFilterList.gpuArchBrand.map(item => item.searchKey),
            },
          },
        });
      }
    
      const motherboardgpusupportFilter = decodedFilterList.gpuBrand;
      if (motherboardgpusupportFilter && motherboardgpusupportFilter.length > 0) {
        cpuFilters.push({
          gpuBrand: {
            name: {
              in: decodedFilterList.gpuBrand.map(item => item.searchKey),
            },
          },
        });
      }
      const graphiccardName = decodedFilterList.graphiccardName;
      if (graphiccardName && graphiccardName.length > 0) {
        cpuFilters.push({
          graphiccardName: {
            name: {
              in: decodedFilterList.graphiccardName.map(item => item.searchKey),
            },
          },
        }); 
      }

     
      if (cpuFilters.length > 0) {
        whereClause.gpus = {
          some: {
            AND: cpuFilters,
          },
        };
      }
    
    
    return{
       data: whereClause.gpus
    }
}