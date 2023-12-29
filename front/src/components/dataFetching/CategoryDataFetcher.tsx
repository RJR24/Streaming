import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface CategoryDataFetcherProps {
  categoryUrl: string;
  transformFunction: (item: any) => any;
  children: (data: any) => ReactNode;
}

const CategoryDataFetcher: React.FC<CategoryDataFetcherProps> = ({
  categoryUrl,
  transformFunction,
  children,
}: CategoryDataFetcherProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(categoryUrl);
        const transformedData = response.data.results.map(transformFunction);
        setData(transformedData);
      } catch (error) {
        console.error(`Error fetching data from ${categoryUrl}:`, error);
      }
    };

    fetchData();
  }, [categoryUrl, transformFunction]);

  return <>{children(data)}</>;
};

export default CategoryDataFetcher;
