import sharp from 'sharp';
import fs from 'fs';

let vivids = { Phantom: ['#FFFFFF', '#E9E9F5', '#000000'], Ephemeral: ['#6096FF', '#66BFFF', '#D7E3FB'], Celestial: ['#FFBD14', '#FFD600', '#00CDCD'], Cataclysmic: ['#CD3966', '#FF0707', '#264CD3'], Jaded: ['#BFFFFF', '#D9D9FF', '#19E8E8'], Ethereal: ['#B8AEF9', '#EFCFCF', '#AAFFFF'], Illusive: ['#6B92DC', '#8EA0FF', '#DEAFF4'], Cryptic: ['#16798F', '#499CBF', '#67E4FF'], Arcane: ['#4C4C85', '#6363A1', '#FFFFFF'], Resolute: ['#506182', '#6D84B0', '#BAF3FF'], Fathomless: ['#000001', '#00033D', '#232D3D'], Elemental: ['#1C0C05', '#3A2504', '#FFE27C'], Corrosive: ['#031805', '#6FFF7D', '#FF4BB7'], Unidentified: ['#6EC2F0', '#77E1C8', '#FF0000'], Intoxicating: ['#3300FF', '#5D35FF', '#FF00E5'], Tartarean: ['#02000C', '#000089', '#FF0000'] };

let name = 'Curiosity';

let svgs = { 1: String.raw`<svg viewBox="0 0 200 200" width="300" height="300"><path d="M98.8789 61.7833C83.3201 73.8846 83.7523 103.706 72.0832 115.375C55.8776 131.58 40.1476 124.796 28 108.46C37.2495 140.017 71.9055 154.958 102.336 140.009C126.971 127.908 120.056 101.113 129.564 97.655C139.072 94.1975 158.953 91.6044 164.572 85.5537C170.19 79.5031 176.241 57.4614 164.572 57.4614C152.903 57.4614 114.438 49.6821 98.8789 61.7833Z" fill="black"></path><path d="M141.001 73.2686C141.001 73.2686 136.38 82.9107 123.004 81.3835C109.628 79.8562 108.438 69.8145 108.438 69.8145C108.438 69.8145 119.914 60.575 127.796 62.8829C135.12 65.0276 141.001 73.2686 141.001 73.2686Z" fill="white"></path><path d="M127.498 79.2018C127.498 79.2018 122.245 77.2136 120.746 73.5951C119.248 69.9766 123.229 64.4865 123.229 64.4865C123.229 64.4865 128.963 64.9845 130.586 70.578C131.765 74.6415 127.498 79.2018 127.498 79.2018Z" fill="black"></path><path d="M126.78 75.3769C126.78 75.3769 127.396 72.618 126.496 70.4465C125.597 68.275 124.218 66.5462 124.218 66.5462C124.218 66.5462 127.66 66.8451 128.634 70.2018C129.341 72.6403 126.78 75.3769 126.78 75.3769Z" fill="white"></path></svg>`, 2: String.raw`<svg viewBox="0 0 200 200" width="300" height="300"><path d="M153.967 73.3526C153.707 71.1412 149.618 69.862 149.618 69.862L146.799 73.3739C146.799 73.3739 148.507 73.6448 149.746 73.8143C150.985 73.9839 154.226 75.564 153.967 73.3526Z" fill="#3E3E60"></path><path d="M118.553 41.1348C100.436 48.2974 92.4312 83.9149 85.2688 91.4987C78.1064 99.0824 70.944 88.9624 56.6191 126.047C64.4131 152.638 104.649 151.326 118.553 138.686C132.456 126.047 131.186 80.7027 139.198 77.7893C147.209 74.8758 153.423 70.4754 158.157 65.3769C162.891 60.2784 157.736 53.3531 151.416 50.8249C145.096 48.2968 136.67 33.9721 118.553 41.1348Z" fill="black"></path><path d="M141.391 64.8857C141.391 64.8857 138.036 71.886 128.325 70.7772C118.613 69.6684 117.75 62.378 117.75 62.378C117.75 62.378 126.081 55.67 131.803 57.3455C137.121 58.9026 141.391 64.8857 141.391 64.8857Z" fill="white"></path><path d="M141.391 64.8857C141.391 64.8857 138.036 71.886 128.325 70.7772C118.613 69.6684 117.75 62.378 117.75 62.378C117.75 62.378 126.081 55.67 131.803 57.3455C137.121 58.9026 141.391 64.8857 141.391 64.8857Z" fill="white"></path><path d="M131.589 69.1937C131.589 69.1937 127.775 67.7502 126.687 65.1232C125.599 62.4961 128.489 58.5102 128.489 58.5102C128.489 58.5102 132.652 58.8718 133.831 62.9327C134.687 65.8829 131.589 69.1937 131.589 69.1937Z" fill="black"></path><path d="M131.067 66.416C131.067 66.416 131.513 64.413 130.86 62.8365C130.207 61.2599 129.207 60.0048 129.207 60.0048C129.207 60.0048 131.705 60.2218 132.412 62.6588C132.926 64.4292 131.067 66.416 131.067 66.416Z" fill="white"></path><path d="M49.7827 114.878C58.2223 114.455 64.13 118.681 64.13 118.681L59.0662 130.513C59.0662 130.513 54.2286 127.778 48.7429 127.778C36.8414 127.778 35.2732 147.677 45.563 152.486C51.8926 155.444 69.6302 153.784 80.1651 155.866C90.7 157.949 105.127 157.605 105.786 168.792C106.518 181.223 87.392 165.902 75.6143 163.606C63.8366 161.311 50.2047 165.096 39.6553 160.092C29.1059 155.088 26.574 143.612 28.6839 134.738C30.7938 125.864 41.3432 115.3 49.7827 114.878Z" fill="black"></path><path d="M127 29.7202V49.5L136.9 41.9774C134.144 37.1535 131.357 33.2851 127 29.7202Z" fill="black"></path><path d="M96.8281 45.96L105.261 54.8549L112.446 48.0434C107.126 46.4394 102.443 45.5492 96.8281 45.96Z" fill="black"></path><path d="M102.735 168.6C102.735 168.6 100.04 171.296 95.7221 169.199C91.4046 167.103 92.1928 163.585 92.1928 163.585C92.1928 163.585 97.1454 161.836 99.5229 163.545C101.732 165.133 102.735 168.6 102.735 168.6Z" fill="white"></path><path d="M97.4924 168.998C97.4924 168.998 95.9611 167.707 95.8853 166.313C95.8095 164.919 97.7979 163.544 97.7979 163.544C97.7979 163.544 99.6676 164.39 99.5514 166.463C99.467 167.969 97.4924 168.998 97.4924 168.998Z" fill="black"></path><path d="M97.703 167.626C97.703 167.626 98.2364 166.771 98.1909 165.934C98.1454 165.097 97.8864 164.353 97.8864 164.353C97.8864 164.353 99.0084 164.861 98.9386 166.105C98.888 167.009 97.703 167.626 97.703 167.626Z" fill="white"></path></svg>`, 3: `<svg viewBox="0 0 200 200" width="300" height="300"><path d="M150.675 66.0887C150.461 63.4962 146.682 58.7402 146.682 58.7402L144.023 60.1855C144.023 60.1855 145.604 61.8886 146.752 63.0953C147.9 64.302 150.889 68.6811 150.675 66.0887Z" fill="#3E3E60"></path><path d="M130.776 30.9888C116.355 30.6983 100.7 52.7324 93.6399 55.8628C67.1731 67.597 41.5899 61.9264 33.5842 102.869C25.5785 143.813 93.187 123.061 98.4444 94.6977C103.702 66.3344 128.085 61.624 134.39 61.9261C140.695 62.2282 145.126 62.7464 150.447 58.0477C155.769 53.349 154.04 50.5407 150.447 47.0065C146.855 43.4722 145.197 31.2794 130.776 30.9888Z" fill="black"></path><path d="M137.305 55.4342C137.305 55.4342 133.611 59.8369 126.85 57.2541C120.09 54.6714 120.812 49.284 120.812 49.284C120.812 49.284 128.022 46.0069 131.818 48.2619C135.345 50.3574 137.305 55.4342 137.305 55.4342Z" fill="white"></path><path d="M129.483 56.7191C129.483 56.7191 127.014 54.982 126.717 52.8977C126.42 50.8133 129.227 48.4868 129.227 48.4868C129.227 48.4868 132.146 49.5125 132.244 52.6418C132.314 54.9151 129.483 56.7191 129.483 56.7191Z" fill="black"></path><path d="M129.62 54.6314C129.62 54.6314 130.309 53.2771 130.131 52.0263C129.953 50.7755 129.466 49.6911 129.466 49.6911C129.466 49.6911 131.218 50.3067 131.277 52.1845C131.319 53.5487 129.62 54.6314 129.62 54.6314Z" fill="white"></path><path d="M139.811 25.6099L136.305 33.9805L143.065 36.8123C142.563 32.7296 141.766 29.2907 139.811 25.6099Z" fill="black"></path><path d="M114.561 28.0698L117.775 36.5565L124.63 33.9599C121.456 31.3429 118.512 29.3953 114.561 28.0698Z" fill="black"></path><path d="M129.674 26.5662L129.077 32.8135L134.123 33.2952C132.953 30.7024 131.721 28.5951 129.674 26.5662Z" fill="black"></path><path d="M96.001 121.011L90.457 96.1079L95.1557 91.4087L99.3846 118.661L103.144 121.011H96.001Z" fill="black"></path><path d="M111.001 104.095L97.0352 82.9514L101.734 78.2522L113.951 101.745L117.709 104.095H111.001Z" fill="black"></path><path d="M73.1837 173.916C32.6622 163.299 33.2446 112.833 33.2446 112.833L50.6299 117.531C50.6299 117.531 44.9914 156.531 80.2318 166.398C115.472 176.265 147.636 150.018 162.459 121.76C149.408 158.015 113.705 184.533 73.1837 173.916Z" fill="black"></path><path d="M155.411 108.603C155.411 126.459 146.953 144.314 141.315 150.892C135.676 157.471 121.58 154.181 121.58 154.181C134.503 154.181 155.411 131.158 140.375 112.833C125.339 94.5077 136.335 81.3508 136.335 81.3508C136.335 81.3508 155.411 90.7483 155.411 108.603Z" fill="black"></path><path d="M149.53 146.485C142.436 149.875 132.388 165.458 132.388 165.458C132.388 165.458 142.093 159.567 153.533 157.94C164.972 156.314 167.878 135.414 167.878 135.414C167.878 135.414 156.625 143.095 149.53 146.485Z" fill="black"></path><path d="M138.098 89.9887C138.098 89.9887 134.168 94.1829 137.54 100.586C140.912 106.99 146.174 105.629 146.174 105.629C146.174 105.629 148.567 98.0791 145.875 94.5804C143.373 91.3289 138.098 89.9887 138.098 89.9887Z" fill="white"></path><path d="M137.756 97.9096C137.756 97.9096 139.776 100.154 141.881 100.199C143.986 100.245 145.96 97.1808 145.96 97.1808C145.96 97.1808 144.593 94.4049 141.475 94.6819C139.209 94.8832 137.756 97.9096 137.756 97.9096Z" fill="black"></path><path d="M139.812 97.5235C139.812 97.5235 141.074 96.6777 142.337 96.7051C143.601 96.7325 144.735 97.0862 144.735 97.0862C144.735 97.0862 143.915 95.4203 142.043 95.5866C140.684 95.7074 139.812 97.5235 139.812 97.5235Z" fill="white"></path><path d="M160.632 147.894C160.632 147.894 160.984 152.795 155.298 155.232C149.611 157.669 146.849 153.932 146.849 153.932C146.849 153.932 149.325 147.63 152.996 146.756C156.408 145.944 160.632 147.894 160.632 147.894Z" fill="white"></path><path d="M156.594 153.337C156.594 153.337 154.045 153.74 152.623 152.637C151.2 151.534 151.539 148.436 151.539 148.436C151.539 148.436 153.941 147.329 155.863 149.192C157.259 150.545 156.594 153.337 156.594 153.337Z" fill="black"></path><path d="M155.437 151.974C155.437 151.974 155.054 150.733 154.201 150.071C153.347 149.409 152.403 149.033 152.403 149.033C152.403 149.033 153.845 148.368 154.998 149.486C155.836 150.298 155.437 151.974 155.437 151.974Z" fill="white"></path><path></path></svg>` };

Object.keys(vivids).forEach(vivid => {
    fs.mkdir(`./${vivid}/${name}`, () => {});
    Object.keys(svgs).forEach(key => {
        sharp(Buffer.from(svgs[key].replaceAll('black', vivids[vivid][0]).replaceAll('white', vivids[vivid][2]).replaceAll('#3E3E60', vivids[vivid][1]))).toFile(`./${vivid}/${name}/${key}.png`, function (err) {});
    });
});
