# 判定対象の時刻を受け取る
target_hour = int(input())
# 開始時刻と終了時刻を受け取る
start_hour, end_hour = map(int, input().split())


if 0 <= target_hour <= 23 and 0 <= start_hour <= 23 and 0 <= end_hour <= 23:
    print("Invalid Input")
    exit()

# 対象の時間が範囲内に含まれているかを判定する
def is_include(target_hour: int, start_hour: int, end_hour: int) -> str:
    if start_hour >= end_hour:
        end_hour += 24
    return "Yes" if start_hour <= target_hour < end_hour else "No"

print(is_include(target_hour, start_hour, end_hour))