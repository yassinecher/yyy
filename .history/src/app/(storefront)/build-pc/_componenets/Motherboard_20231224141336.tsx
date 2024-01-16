"use client"
import prismadb from '@/lib/prismadb'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Motherboard = async() => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/motherboard?page=${currentPage}`);
      setData(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
       {data.map(item=>(<>z</>))}
    </div>
  )
}
