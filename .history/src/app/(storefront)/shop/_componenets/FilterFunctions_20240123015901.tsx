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
        whereClause
    }
}