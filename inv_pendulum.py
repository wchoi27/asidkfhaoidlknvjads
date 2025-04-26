from .visual import CoCoPart
import numpy as np
from helpers import *
from defaultparams import *


def match_ip(ip_set, new_ips, lstm_set, num_matched, consecutive_frames=DEFAULT_CONSEC_FRAMES):
  len_ip_set = len(ip_set)
  added = [False for _ in range(len_ip_set)]

  new_len_
