import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import isEqual from "lodash/isEqual";
import { copyObj } from "../../utils/common";
import { data } from "./dummy-table-data";

const Table = (props) => {
	const {
		columns,
		tableDATA,
		dataURL,
		useSelfToken,
		query,
		search,
		filter,
		showPagination: paginationSetting,
		populateValue,
		sorting,
		selectValues,
		customStyles = {},
		expandableRows = false,
		expandedComponent,
	} = props;

	const showPagination = paginationSetting ? paginationSetting : true;
	const [tableData, setTableData] = useState(tableDATA);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [resPaginator, setResPaginator] = useState({});
	const defaultSort = sorting ? Object.keys(sorting)[0] : null;

	const [obj, setObj] = useState({
		query: filter ? filter.query : query ? query : {},
		options: {
			select: selectValues ? selectValues : {},
			limit: pageSize,
			page: currentPage,
			sort: sorting,
			pagination: true,
			populate: populateValue === undefined ? [] : [...populateValue],
		},
		search: filter ? filter.search : search ? search : undefined,
	});

	useEffect(() => {
		if (obj) {
			setLoading(true);
			/*
			 *	Axios({ ...dataURL, data: obj, useSelfToken })
			 *		.then((res) => {
			 *			setTableData(res.data.data === null ? [] : res.data.data.list);
			 *			setResPaginator(
			 *				res.data.data === null ? [] : res.data.data.pagination
			 *			);
			 *		})
			 *		.finally(() => {
			 *			setLoading(false);
			 *		});
			 */
			// Note : This is to immitate the loading from API

			setTimeout(() => {
				const tabData = data;
				const parsedData = tabData
					.sort(
						(a, b) =>
							+a[Object.keys(obj.options.sort)[0]] -
							+b[Object.keys(obj.options.sort)[0]] *
								Object.values(obj.options.sort)[0]
					)
					.slice(
						obj.options.page * obj.options.limit - obj.options.limit,
						obj.options.page * obj.options.limit
					);
				setTableData(parsedData);
				setResPaginator({
					total_entries: data.length,
					per_page: obj.options.limit,
					total_pages: Math.ceil(data.length / obj.options.limit),
					current_page: obj.options.page,
					hasPrevPage: obj.options.page > 1,
					hasNextPage:
						obj.options.page < Math.ceil(data.length / obj.options.limit),
					previous_page:
						obj.options.page > 1 ? +obj.options.page - 1 : null,
					next_page:
						Math.ceil(data.length / obj.options.limit) !==
						obj.options.page
							? +obj.options.page + 1
							: null,
				});
				setLoading(false);
			}, 1000);
		}
		return () => {
			setTableData([]);
		};
	}, [dataURL, obj, useSelfToken]);

	useEffect(() => {
		if (query !== null && query !== undefined) {
			let options = copyObj(obj);
			options = {
				...options,
				query: query,
			};
			setObj(options);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	useEffect(() => {
		if (search) {
			let options = { ...obj };
			options["search"] = search;
			setObj(options);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (filter) {
			let options = copyObj(obj);

			if (!!filter.search?.value || filter.search?.value === "") {
				options["search"] = filter.search;
			}

			if (
				filter.query !== null &&
				filter.query !== undefined &&
				!isEqual(obj.query, filter.query)
			) {
				options["query"] = filter.query;
			}
			if (!isEqual(options, obj)) {
				setObj(options);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const handlePerRowsChange = (pgSize) => {
		let options = {
			...obj,
			options: {
				...obj.options,
				limit: pgSize,
				page: 1,
			},
		};
		setCurrentPage(1);
		setObj(options);
		setPageSize(pgSize);
	};

	const handlePageChange = (pgNo) => {
		let options = {
			...obj,
			options: {
				...obj.options,
				page: pgNo,
			},
		};
		setObj(options);
		setCurrentPage(pgNo);
	};

	const handleSort = (column, sortDirection) => {
		let direction;
		if (sortDirection === "desc") {
			direction = -1;
		} else if (sortDirection === "asc") {
			direction = 1;
		}

		let tFilter = {};
		tFilter[column.id] = direction;

		let options = {
			...obj,
			options: {
				...obj.options,
				sort: {
					...tFilter,
				},
			},
		};
		setObj(options);
	};

	return (
		<div className="react-dataTable position-relative">
			<DataTable
				noHeader
				persistTableHead={true}
				className="react-dataTable"
				customStyles={customStyles}
				progressPending={loading}
				progressComponent={
					<div className="d-flex justify-content-center my-4 gap-1">
						<span className="">Loading...</span>
					</div>
				}
				columns={columns}
				data={tableData}
				expandableRows={expandableRows}
				expandableRowsComponent={expandedComponent}
				expandableRowExpanded={(row) => (row.id ? true : false)}
				paginationServer
				pagination={showPagination}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handlePerRowsChange}
				paginationPerPage={pageSize}
				paginationTotalRows={resPaginator ? resPaginator?.total_entries : 0}
				sortServer
				defaultSortFieldId={defaultSort}
				defaultSortAsc={true}
				onSort={(column, sortDirection) => {
					handleSort(column, sortDirection);
				}}
			/>
		</div>
	);
};

export default Table;
