import React, { useMemo, useState } from "react";
import CardMenu from "./card/CardMenu";
import Checkbox from "./checkbox";
import Card from "./card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import NominatedBookService from "../../service/NominatedBookService";
import { useQuery } from "@tanstack/react-query";

const CheckTable = (props) => {
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Sách top
        </div>

        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full table-auto border-collapse "
          // variant="simple"
          color="gray-500"
        // mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index} className="hover:bg-gray-100">
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "STT") {
                      data = (
                        <div className="flex items-center gap-2">
                          {/* <Checkbox /> */}
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    }
                    if (cell.column.Header === "Tên sách") {
                      data = (
                        <div className="flex items-center gap-2">
                          {/* <Checkbox /> */}
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Lượt đề cử") {
                      data = (
                        <div className="flex items-center text-center ">
                          <p className="text-sm w-full text-center font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Ngày thêm") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
