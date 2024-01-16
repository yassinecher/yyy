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
      const response = await axios.get(`/api/data?page=${currentPage}`);
      setData(response.data.results);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>

    </div>
  )
}
