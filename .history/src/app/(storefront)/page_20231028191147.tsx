import Navbar from "@/components/front/Header";
import Main from "@/components/front/main";
import { MantineProvider, createTheme } from '@mantine/core';
export default function Home() {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return <>
  <MantineProvider theme={theme}>


   <Main></Main>  </MantineProvider>
   </>;
}
