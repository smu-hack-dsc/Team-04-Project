from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection