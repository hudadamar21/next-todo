import { useState } from "react"

export default function Home() {
  const [ activityItem, setActivityItem ] = useState([])

  return (
   <div>
     <nav data-cy="header-background">
      <h1 data-cy="header-title">TODO APP</h1>
     </nav>
     <div>
       <div>
         <h2 data-cy="activity-title">Activity</h2>
         <button data-cy="activity-add-button">
           Tambah
         </button>
       </div>
       {
         activityItem.length === 0
         ?  <div data-cy="activity-empty-state">
              Empty
            </div>
         :  <div data-cy="activity-item">
              <h3 data-cy="activity-item-title">New Activity</h3>
              <div>
                <span data-cy="activity-item-date">12/2/2020</span>
                <button data-cy="activity-item-delete-button">
                  delete
                </button>
              </div>
            </div>
       }
     </div>
   </div>
  )
}
