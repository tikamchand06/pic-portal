import logo from "./icon.png";
import React, { useState } from "react";
import Search from "./components/Search";
import Photos from "./components/Photos";
import Videos from "./components/Videos";
import Favourites from "./components/Favourites";
import Collections from "./components/Collections";
import { Tabs, Image, Button, Layout, Typography } from "antd";

const { Footer, Content } = Layout;
const { Text, Link, Title } = Typography;

export default function App() {
  const [activeTab, setActiveTab] = useState("photos");

  const tabItems = [
    { key: "photos", label: "Photos", icon: <i className='bi bi-images' />, children: <Photos /> },
    { key: "videos", label: "Videos", icon: <i className='bi bi-camera-reels' />, children: <Videos /> },
    { key: "favourites", label: "Favourites", icon: <i className='bi bi-heart' />, children: <Favourites /> },
    { key: "collection", label: "Collections", icon: <i className='bi bi-collection' />, children: <Collections /> },
    { key: "search", label: "Search", icon: <i className='bi bi-search' />, children: <Search /> },
  ];

  return (
    <Layout className='app-container h-100vh'>
      <Content style={{ height: "calc(100% - 38px)" }} className='bg-white'>
        <Tabs
          centered
          items={tabItems}
          className='h-100'
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={{
            left: (
              <div className='flex-item gap-1'>
                <Image src={logo} alt='logo' preview={false} height={36} />
                <Title level={3} className='m-0 fw-bold'>
                  Pic Portal
                </Title>
              </div>
            ),
            right: <Button type='text' onClick={() => window?.close()} icon={<i className='bi bi-x-lg' />} />,
          }}
        />
      </Content>

      <Footer className='fw-500 flex-item space-between'>
        <Text>
          &copy; {new Date().getFullYear()} Pic Portal. Designed & Developed by{" "}
          <Link href='https://www.tcmhack.in' target='_blank'>
            https://www.tcmhack.in
          </Link>
        </Text>
        <Link href='https://www.pexels.com' target='_blank' className='flex-item gap-1'>
          <img src='https://images.pexels.com/lib/api/pexels.png' className='h-16px' alt='pexels logo' />
          <span className='fs-10px lh-1'>Photos Provided by Pexels</span>
        </Link>
      </Footer>
    </Layout>
  );
}
