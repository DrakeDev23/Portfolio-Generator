from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()

templates = Jinja2Templates(directory="app/templates")

@app.get("/")
async def home(request: Request):
   return templates.TemplateResponse(
    request=request,
    name="index.html"
)   

@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="about.html"
    )