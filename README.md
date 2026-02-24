# HRMS Lite 

this is a simple Human Resource Managment System (HRMS) i built to practice fully stack development. it basically helps handling employees and there attendance. i tried to make the UI look clean but its still a work in progress.

### What it does?
- **Employee Management**: You can add, edit and see all employees. I used a table for this.
- **Attendance**: tracking who's in and who's out. 
- **Dashbaord**: a quick overview of whats happening in the company. 

### Tech stuff i used
* **Frontend**: React with Vite (super fast!!) and Tailwind CSS for the styling.
* **Backend**: FastAPI (Python). its really quick to setup compared to other things ive used.
* **Database**: (I think I used PostgreSQL but i need to check again lol)

### How to get it running

#### backend
1. go into the `backend` folder
2. setup a venv: `python -m venv venv`
3. install stuff: `pip install -r requirements.txt`
4. run it: `uvicorn app.main:app --reload`

#### frontend
1. go into `frontend`
2. `npm install`
3. `npm run dev`


sorry if there are bugs, i'm still learning! feel free to reach out if u have any questions.
