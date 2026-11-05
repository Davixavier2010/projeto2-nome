Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\assets\images\logo-rida.png"
$bmp = [System.Drawing.Bitmap]::new($srcPath)

$w = $bmp.Width
$h = $bmp.Height

# 1. Detect background color from corners
$cornerColor = $bmp.GetPixel(10, 10)
$bgR = $cornerColor.R
$bgG = $cornerColor.G
$bgB = $cornerColor.B

# 2. Find bounding box of the emblem
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Distance from background
        $dist = [Math]::Sqrt([Math]::Pow($c.R - $bgR, 2) + [Math]::Pow($c.G - $bgG, 2) + [Math]::Pow($c.B - $bgB, 2))
        if ($dist -gt 25) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add 8px padding
$minX = [Math]::Max(0, $minX - 8)
$minY = [Math]::Max(0, $minY - 8)
$maxX = [Math]::Min($w - 1, $maxX + 8)
$maxY = [Math]::Min($h - 1, $maxY + 8)

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1

Write-Host "Logo bounded: $cropW x $cropH at ($minX, $minY)"

# 3. Create transparent bitmaps
$transBmp = [System.Drawing.Bitmap]::new($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$whiteBmp = [System.Drawing.Bitmap]::new($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $orig = $bmp.GetPixel($minX + $x, $minY + $y)
        $dist = [Math]::Sqrt([Math]::Pow($orig.R - $bgR, 2) + [Math]::Pow($orig.G - $bgG, 2) + [Math]::Pow($orig.B - $bgB, 2))

        if ($dist -le 18) {
            # Background -> Fully transparent
            $transBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $whiteBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            # Smooth anti-aliasing on the edges
            $alpha = 255
            if ($dist -lt 55) {
                $alpha = [int](($dist - 18) / (55 - 18) * 255)
                $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
            }
            # Original colored emblem with transparent bg
            $transColor = [System.Drawing.Color]::FromArgb($alpha, $orig.R, $orig.G, $orig.B)
            $transBmp.SetPixel($x, $y, $transColor)

            # Pure white emblem with transparent bg
            $whiteColor = [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255)
            $whiteBmp.SetPixel($x, $y, $whiteColor)
        }
    }
}

$bmp.Dispose()

$outTrans = Join-Path $PSScriptRoot "..\assets\images\logo-rida-transparent.png"
$outWhite = Join-Path $PSScriptRoot "..\assets\images\logo-rida-white.png"

$transBmp.Save($outTrans, [System.Drawing.Imaging.ImageFormat]::Png)
$whiteBmp.Save($outWhite, [System.Drawing.Imaging.ImageFormat]::Png)

$transBmp.Dispose()
$whiteBmp.Dispose()

Write-Host "Successfully saved $outTrans and $outWhite"
