import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import axios from "axios"

import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr:nth-child(even) {background-color: white;}

    tr:hover {background-color: coral;}

    th {
      background-color: lightskyblue;
      color: black;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
    
  }

  .pagination {
    padding: 0.5rem;
  }
`


// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // TODO make editable fields
  // return <input value={value} onChange={onChange} onBlur={onBlur} />
  return <>{value}</>
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function EditableTable() {

  const [fields, setFields] = useState({
    sex: "",
    sn_left_min: "",
    sn_left_max: "",
    sn_right_min: "",
    sn_right_max: "",
    sn_right_min: "",
    birth_from: "",
    birth_to: "",
    visit_from: "",
    visit_to: ""});

  const { register, handleSubmit, formState: { errors } } = useForm();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Patient ID',
            accessor: 'patient_id',
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Sex',
            accessor: 'sex',
          },
          {
            Header: 'Birth date',
            accessor: 'birth_date',
          },
          {
            Header: 'Visit date',
            accessor: 'visit_date',
          },
          {
            Header: 'SN right',
            accessor: 'sn_right',
          },
          {
            Header: 'SN left',
            accessor: 'sn_left',
          },
          {
            Header: 'Username',
            accessor: 'user_name',
          },

        ],
      },
    ],
    []
  )
  
  const url = "http://[::1]:8438/prediction/do-dashboard/"

  function onSubmit (data) {
      console.log("Data:", data)
    
      let param = ""
      let started = false
      if (data.sex) {
        if (started) {
          param = param + "&"
        }
        param = param + "sex=" + data.sex;
        started = true
      }
      if (data.sn_left_min) {
        if (started) {
          param = param + "&"
        }
        param = param + "sn_left_min=" + data.sn_left_min;
        started = true
      }
      if (data.sn_left_max) {
        if (started) {
          param = param + "&"
        }
        param = param + "sn_left_max=" + data.sn_left_max;
        started = true
      }
      if (data.sn_right_min) {
        if (started) {
          param = param + "&"
        }
        param = param + "sn_right_min=" + data.sn_right_min;
        started = true
      }
      if (data.sn_right_max) {
        if (started) {
          param = param + "&"
        }
        param = param + "sn_right_max=" + data.sn_right_max;
        started = true
      }
      if (data.visit_from) {
        if (started) {
          param = param + "&"
        }
        param = param + "visit_from=" + data.visit_from;
        started = true
      }
      if (data.visit_to) {
        if (started) {
          param = param + "&"
        }
        param = param + "visit_to=" + data.visit_to;
        started = true
      }
      if (data.birth_from) {
        if (started) {
          param = param + "&"
        }
        param = param + "birth_from=" + data.birth_from;
        started = true
      }
      if (data.birth_to) {
        if (started) {
          param = param + "&"
        }
        param = param + "birth_to=" + data.birth_to;
        started = true
      }
   
      if (param) {
        param = "?"+param
      }
  
      console.log("param:"+param)
      const url = "http://[::1]:8438/prediction/do-dashboard/" + param
      console.log(url)

    axios
    .get(url,
        "",
        {
            headers: {
                "Content-type": "multipart/form-data",
            },

            responseType: "application/JSON", // TODO verify thiss
        }
    )
    .then((res) => {
        setData(res.data.predictions);
    })
    .catch((err) => {
        alert("Error during request.")      
        console.log("Error: " + err);
    })
  }

  function resetForm(){
    // TODO
  }

  const [data, setData] = React.useState(null)
  const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData)

  return (
    <div className="main_container">
      <Header/>
      <Styles>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row_dashboard">
        <div className="column_dashboard">
          Date of Visit
          <br/>
          <label htmlFor="visit_from">From:</label>
          <input type="date" id="visit_from" name="visit_from" {...register("visit_from")}/>
          <label htmlFor="visit_to">To:</label>
          <input type="date" id="visit_to" name="visit_to" {...register("visit_to")}/>
          <br/><br/>
          Date of birth
          <br/>
          <label htmlFor="birth_from">From:</label>
          <input type="date" id="birth_from" name="birth_from" {...register("birth_from")}/>
          <label htmlFor="birth_to">To:</label>
          <input type="date" id="birth_to" name="birth_to" {...register("birth_to")}
          /><br/><br/>
          <label htmlFor="sex">Sex:</label>
          <select name="sex" id="sex" {...register("sex")}>
            <option value='A'>All</option>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select><br/><br/>
          </div>
        <div className="column_dashboard">
           SN Right<br/>
          <label htmlFor="sn_right_min">min</label>
          <input type="number" id="sn_right_min" name="sn_right_min" min="0" {...register("sn_right_min")}/>
          <label htmlFor="sn_right_max">max</label>
          <input type="number" id="sn_right_max" name="sn_right_max" min="0" {...register("sn_right_max")}/>
          <br/><br/>
          SN Left<br/>
          <label htmlFor="sn_left_min">min</label>
          <input type="number" id="sn_left_min" name="sn_left_min" min="0" {...register("sn_left_min")}/>
          <label htmlFor="sn_left_max">max</label>
          <input type="number" id="sn_left_max" name="sn_left_max" min="0" {...register("sn_left_max")}/>
          </div>
          </div>
          
          {errors.visit_from       && <span>This field is required</span>}
          {errors.sn_left_min       && <span>This field is required</span>}

          <input className="button3" type="submit"/>
          <input className="button3" type="reset" onClick={resetForm}/>
          
        </form>
        <button className="button3" onClick={resetData}>Reset Table</button>
        {data && (<Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />)}
      </Styles>
      <Footer/>
    </div>
  )
}

export default EditableTable;
