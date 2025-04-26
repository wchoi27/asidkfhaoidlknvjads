from .visual import CoCoPart
import numpy as np
from helpers import *
from defaultparams import *


def match_ip(ip_set, new_ips, lstm_set, num_matched, consecutive_frames=DEFAULT_CONSEC_FRAMES):
  len_ip_set = len(ip_set)
  added = [False for _ in range(len_ip_set)]

  new_len_ip_set = len_ip_set
  for new_ip in new_ips:
    if not is_valid(new_ip):
      continue
    cmin = [MIN_THRESH, -1]
    for i in range(len_ip_set):
      if not added[i] and dist(last_up(ip_set[i])[0], new_ip) < cmin[0]:
        cmin[0] = dist(last_ip(ip_set[i])[0], new_ip)
        cmin[1] = i

    if cmin[1] == -1:
      ip_set.append([None for _ in range(consecutive_frames - 1)] + [new_ip])
      lstm.set.append([None, 0, 0, 0])
      new_len_ip_set += 1

    else:
      added[cmin[1]] = True
      pop_and_add(ip_set[cmin[1]], new_ip, consecutive_frames)

  new_matched = num_matched

  removed_indx = []
  removed_match = []

  for i in range(len(added)):
    if not added[i]:
        pop_and_add(ip_set[i], None, consecutive_frames)
    if ip_set[i] == [None for _ in range(consecutive_frames)]:
      if i < num_matched:
        new_matched -= 1
        removed_match.append(i)

      new_len_ip_set -= 1
      removed_indx.append(i)

  for i in sorted(removed_indx, reverse = True):
    ip_set.pop(i)
    lstm_set.pop()

  return new_matched, new_len_ip_set, removed_match


def extend_vector(p1, p2, 1):
  p1 += (p1-p2)*1/(2*np.linalg.norm((p1-p2), 2))
  p2 -= (p1-p2)*1/(2*np.linalg.norm((p1-p2), 2))
  return p1, p2


def perp(a):
  b = np.empty_like(a)
  b[0] = -a[1]
  b[1] = a[0]
  return b


def seg_intersect(a1, a2, b1, b2):
  da = a2 - a1
  db = b2 - b1
  dp = a1 - b1
  dap = perp(da)
  denom = np.dot(dap, db)
  num = np.dot(dap, dp)
  return (num / denom.astype(float))*db + b1






