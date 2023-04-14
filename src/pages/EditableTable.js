import React, { useState } from 'react'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import axios from "axios"
import { useTranslation} from 'react-i18next';
import {GetItem} from "../utils";
import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

import "./Dashboard.css"

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
  .input {
    font-size: 14px;
    font-size: max(16px, 1em);
    font-family: inherit;
    padding:10px;
    margin:10px;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 4px;
  }
  .input:not(textarea) {
    line-height: 1;
    height: 2.25rem;
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

  const { t } = useTranslation();

  const isLoggedIn = Boolean(GetItem("logged_in"))

  const [fields, setFields] = useState({
    sex: "",
    sn_left_min: "",
    sn_left_max: "",
    sn_right_min: "",
    sn_right_max: "",
    birth_from: "",
    birth_to: "",
    visit_from: "",
    visit_to: "",
    age_onset_min: "",
    age_onset_max: ""
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          {
            Header: t('dashboard.p1'),
            accessor: 'patient_id',
          },
          {
            Header: t('dashboard.p4'),
            accessor: 'age_onset',
          },
          {
            Header: t('dashboard.p5'),
            accessor: 'sex',
          },
          {
            Header: t('dashboard.p6'),
            accessor: 'birth_date',
          },
          {
            Header: t('dashboard.p7'),
            accessor: 'visit_date',
          },
          {
            Header: t('dashboard.p8'),
            accessor: 'sn_right',
          },
          {
            Header: t('dashboard.p9'),
            accessor: 'sn_left',
          },
          {
            Header: t('dashboard.p3'),
            accessor: 'notes',
          },
          {
            Header: t('dashboard.p10'),
            accessor: 'user_name',
          },

        ],
      },
    ],
    []
  )
  
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
      if (data.age_onset_min) {
        if (started) {
          param = param + "&"
        }
        param = param + "age_onset_min=" + data.age_onset_min;
        started = true
      }
      if (data.age_onset_max) {
        if (started) {
          param = param + "&"
        }
        param = param + "age_onset_max=" + data.age_onset_max;
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
    console.log("resetForm")
    setValue('sex', 'A')
    setValue('sn_left_min', '0')    
    setValue('sn_left_max', '')
    setValue('sn_right_min', '')
    setValue('sn_right_max', '')
    setValue('birth_from', '')
    setValue('birth_to', '')
    setValue('visit_from', '')
    setValue('visit_to', '')
    setValue('age_onset_min', '')
    setValue('age_onset_max', '')
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
    <> {!isLoggedIn ? 
      <Redirect to="SignIn"/> 
      :
      <div className="main_container">
        <Header/>
        <Styles>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row_dashboard">
          <div className="column_dashboard">
          {t('dashboard.p11')}
            <br/>
            <label htmlFor="visit_from">{t('dashboard.p12')}</label>
            <input type="date" id="visit_from" name="visit_from" {...register("visit_from")}/>
            <label htmlFor="visit_to">{t('dashboard.p13')}</label>
            <input type="date" id="visit_to" name="visit_to" {...register("visit_to")}/>
            <br/><br/>
            {t('dashboard.p14')}
            <br/>
            <label htmlFor="birth_from">{t('dashboard.p15')}</label>
            <input type="date" id="birth_from" name="birth_from" {...register("birth_from")}/>
            <label htmlFor="birth_to">{t('dashboard.p16')}</label>
            <input type="date" id="birth_to" name="birth_to" {...register("birth_to")}
            /><br/><br/>
            <label htmlFor="sex">{t('dashboard.p17')}</label>
            <select name="sex" id="sex" {...register("sex")}>
              <option value='A'>{t('dashboard.p20')}</option>
              <option value='M'>{t('dashboard.p21')}</option>
              <option value='F'>{t('dashboard.p22')}</option>
            </select><br/><br/>
            </div>
          <div className="column_dashboard">
          {t('dashboard.p18')}<br/>
            <input type="number" step="any" id="sn_right_min" name="sn_right_min" min="0" placeholder="min" {...register("sn_right_min")}/>
            <input type="number" step="any" id="sn_right_max" name="sn_right_max" min="0" placeholder="max"{...register("sn_right_max")}/>
            <br/><br/>
            {t('dashboard.p19')}<br/>
            <input type="number" step="any" id="sn_left_min" name="sn_left_min" min="0" placeholder="min" {...register("sn_left_min")}/>
            <input type="number" step="any" id="sn_left_max" name="sn_left_max" min="0" placeholder="max" {...register("sn_left_max")}/>
            <br/><br/>
            {t('dashboard.p4')}<br/>
            <input type="number" step="any" id="age_onset_min" name="age_onset_min" min="0" placeholder="min" {...register("age_onset_min")}/>
            <input type="number" step="any" id="age_onset_max" name="age_onset_max" min="0" placeholder="max" {...register("age_onset_max")}/>
            </div>
            </div>
            
            {/* {errors.visit_from       && <span>This field is required</span>}
            {errors.sn_left_min       && <span>This field is required</span>} */}

            <input className="button3" type="submit"/>
            <input className="button3" type="reset" onClick={resetForm}/>
            
          </form>
          {/* <button className="button3" onClick={resetData}>{t('dashboard.p23')}</button> */}
          {data && (<Table
            columns={columns}
            data={data}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />)}
        </Styles>
        <Footer/>
      </div>
    }
    </>
  )
}

export default EditableTable;
